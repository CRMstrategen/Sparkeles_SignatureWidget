console.log("Generating ZIP");
var {
    createWriteStream,
    createReadStream,
    renameSync,
    unlinkSync,
    existsSync,
} = require("fs");
var archiver = require("archiver");

if (existsSync("./app")) unlinkSync("./app");
renameSync("./dist", "./app");
const output = createWriteStream("dist.zip");
const archive = archiver("zip");

output.on("close", function () {
    console.log("ZIP has been generated!");
    renameSync("./app", "./dist");
});

archive.on("error", function (err) {
    renameSync("./app", "./dist");
    throw err;
});

archive.pipe(output);

// append files from a sub-directory, putting its contents at the root of archive
archive.glob(
    "app/**/*",
    {
        ignore: [
            "app/plugin-manifest.json",
            "app/resources.json",
            "app/app/translations/en.json",
        ],
        root: "app",
    },
    {
        name: "app",
    }
);

archive.append(createReadStream("app/resources.json"), {
    name: "resources.json",
});

archive.append(JSON.stringify({}), {
    name: "app/translations/en.json",
});

const manifest = require("./app/plugin-manifest.json");

if (manifest.connectors.length > 0)
    manifest.zohoAuthorisation = {
        ...(manifest.connectors[0] || {}),
        type: "connectors",
    };
manifest.connectors = [];
manifest.modules.widgets = manifest.modules.widgets.map((e) => ({
    ...e,
    url: "/app" + e.url,
    logo: "/app" + e.logo,
    icon: "/app" + e.icon,
}));

archive.append(JSON.stringify(manifest), {
    name: "plugin-manifest.json",
});

archive.finalize();
