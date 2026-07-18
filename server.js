const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
const DATA_FILE = path.join(ROOT_DIR, "data", "poll-data.json");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

function ensureDataFile() {
  const dataDir = path.dirname(DATA_FILE);

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    const initial = {
      votes: { Yes: 0, Maybe: 0 },
      submissions: [],
    };

    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2));
  }
}

function readPollData() {
  ensureDataFile();

  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);

    return {
      votes: {
        Yes: Number(parsed?.votes?.Yes) || 0,
        Maybe: Number(parsed?.votes?.Maybe) || 0,
      },
      submissions: Array.isArray(parsed?.submissions) ? parsed.submissions : [],
    };
  } catch (error) {
    return {
      votes: { Yes: 0, Maybe: 0 },
      submissions: [],
    };
  }
}

function writePollData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

function sendNotFound(response) {
  sendJson(response, 404, { error: "Not found" });
}

function parseRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        reject(new Error("Payload too large"));
        request.destroy();
      }
    });

    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error("Invalid JSON"));
      }
    });

    request.on("error", reject);
  });
}

function buildVotes(submissions) {
  return {
    Yes: submissions.filter((item) => item.answer === "Yes").length,
    Maybe: submissions.filter((item) => item.answer === "Maybe").length,
  };
}

function handleApi(request, response) {
  if (request.method === "GET" && request.url === "/api/poll") {
    const data = readPollData();
    sendJson(response, 200, data);
    return true;
  }

  if (request.method === "POST" && request.url === "/api/submissions") {
    parseRequestBody(request)
      .then((body) => {
        const studentName = String(body.studentName || "").trim();
        const answer = body.answer;

        if (!studentName || (answer !== "Yes" && answer !== "Maybe")) {
          sendJson(response, 400, { error: "Invalid submission" });
          return;
        }

        const data = readPollData();
        data.submissions.push({
          studentName,
          answer,
          time: new Date().toLocaleString(),
        });
        data.votes = buildVotes(data.submissions);

        writePollData(data);
        sendJson(response, 201, data);
      })
      .catch(() => {
        sendJson(response, 400, { error: "Invalid request body" });
      });

    return true;
  }

  if (request.method === "DELETE" && request.url === "/api/poll") {
    const resetData = {
      votes: { Yes: 0, Maybe: 0 },
      submissions: [],
    };

    writePollData(resetData);
    sendJson(response, 200, resetData);
    return true;
  }

  return false;
}

function handleStatic(request, response) {
  const safePath = request.url === "/" ? "/index.html" : request.url;
  const absolutePath = path.normalize(path.join(ROOT_DIR, safePath));

  if (!absolutePath.startsWith(ROOT_DIR)) {
    sendNotFound(response);
    return;
  }

  fs.stat(absolutePath, (error, stats) => {
    if (error || !stats.isFile()) {
      sendNotFound(response);
      return;
    }

    const extension = path.extname(absolutePath).toLowerCase();
    const contentType = MIME_TYPES[extension] || "application/octet-stream";

    response.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-cache",
    });

    fs.createReadStream(absolutePath).pipe(response);
  });
}

const server = http.createServer((request, response) => {
  if (handleApi(request, response)) {
    return;
  }

  handleStatic(request, response);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Shared poll server running at http://0.0.0.0:${PORT}`);
});
