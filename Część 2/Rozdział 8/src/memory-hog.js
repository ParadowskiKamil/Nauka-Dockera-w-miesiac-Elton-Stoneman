const fs = require("fs");

async function allocate() {
  var allocatedMb = process.env.LOOP_ALLOCATION_MB * loop;
  fs.writeFileSync("ALLOCATED_MB", allocatedMb, "utf-8");

  if (process.env.MAX_ALLOCATION_MB < process.env.LOOP_ALLOCATION_MB * loop) {
    console.log("Too much memory allocated, the application will shut down in 30 seconds");
    await sleep(30000);
    console.log("Shutting down the application!")
    process.exit(1);
  }

  console.log(`Allocated: ${allocatedMb}MB`);
  loop++;
  setTimeout(allocate, process.env.LOOP_INTERVAL_MS);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var loop = 1;
allocate();
