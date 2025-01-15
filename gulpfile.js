const fs = require("fs/promises");
const path = require("path");
const gulp = require("gulp");
const sharp = require("sharp");

gulp.task("favicon", async () => {
  const FAVICON_CONFIGS = [
    { size: 16, suffix: "16x16" },
    { size: 32, suffix: "32x32" },
    { size: 48, suffix: "48x48" },
    { size: 96, suffix: "96x96" },
    { size: 57, suffix: "57x57", prefix: "apple-touch-icon" },
    { size: 72, suffix: "72x72", prefix: "apple-touch-icon" },
    { size: 114, suffix: "114x114", prefix: "apple-touch-icon" },
    { size: 144, suffix: "144x144", prefix: "apple-touch-icon" },
    { size: 180, suffix: "180x180", prefix: "apple-touch-icon" },
    { size: 192, suffix: "192x192", prefix: "android-chrome" },
    { size: 512, suffix: "512x512", prefix: "android-chrome" },
    { size: 70, suffix: "70x70", prefix: "ms-tile" },
    { size: 150, suffix: "150x150", prefix: "ms-tile" },
    { size: 310, suffix: "310x310", prefix: "ms-tile" },
  ];

  const sourcePath = "./src/favicon.jpg";
  const outputDir = "./dist";

  await sharp(sourcePath)
    .resize(32, 32)
    .toFile(path.join(outputDir, "favicon.ico"));

  for (const config of FAVICON_CONFIGS) {
    const prefix = config.prefix || "favicon";
    const fileName = `${prefix}-${config.suffix}.png`;

    await sharp(sourcePath)
      .resize(config.size, config.size, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .png()
      .toFile(path.join(outputDir, fileName));
  }

  const manifest = {
    name: "Jonathan About",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  };

  await fs.writeFile(
    path.join(outputDir, "site.webmanifest"),
    JSON.stringify(manifest, null, 2),
  );
});

gulp.task("images", async () => {
  const files = await fs.readdir("./src/img");

  for (const file of files) {
    const filePath = path.join("./src/img", file);
    const fileName = path.parse(file).name;
    const fileExt = path.parse(file).ext.toLowerCase();
    const isJpg = fileExt === ".jpg" || fileExt === ".jpeg";
    const isPng = fileExt === ".png";

    await sharp(filePath)
      .jpeg({ quality: isJpg ? 60 : undefined })
      .png({ quality: isPng ? 60 : undefined })
      .toFile(path.join("./dist/img", `${fileName}@2x${fileExt}`));

    await sharp(filePath)
      .metadata()
      .then((metadata) => {
        return sharp(filePath)
          .resize(
            Math.round(metadata.width / 2),
            Math.round(metadata.height / 2),
          )
          .jpeg({ quality: isJpg ? 60 : undefined })
          .png({ quality: isPng ? 60 : undefined })
          .toFile(path.join("./dist/img", `${fileName}${fileExt}`));
      });
  }
});

gulp.task("html", () => {
  return gulp.src("./src/*.html").pipe(gulp.dest("./dist"));
});

gulp.task("watch", () => {
  gulp.watch("./src/*.html", gulp.series("html"));
});

gulp.task("default", gulp.series("favicon", "images", "html"));
