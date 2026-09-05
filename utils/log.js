const chalk = require("chalk");

function styledLog({ prefix = "🔷", label = "Mirrykal", suffix = "🔷", color = "#33ffc9", msg }) {
  console.log(chalk.bold.hex(color)(`${prefix} [ ${label} ] » ${msg} ${suffix}`));
}

module.exports = (msg, type = "info") => {
  switch (type.toLowerCase()) {
    case "warn":
      styledLog({ prefix: "⚠️", label: "Emma Olivia", suffix: "⚠️", color: "#FFD700", msg });
      break;
    case "error":
      styledLog({ prefix: "❌", label: "Emma Olivia", suffix: "❌", color: "#FF3333", msg });
      break;
    case "success":
      styledLog({ prefix: "✅", label: "Emma Olivia", suffix: "✅", color: "#00FF7F", msg });
      break;
    case "load":
      styledLog({ prefix: "🔄", label: "Emma Olivia", suffix: "🔄", color: "#00CED1", msg });
      break;
    default:
      styledLog({ prefix: "ℹ️", label: "Emma Olivia", suffix: "ℹ️", color: "#00BFFF", msg });
      break;
  }
};

module.exports.loader = (msg, type = "info") => {
  switch (type.toLowerCase()) {
    case "warn":
      styledLog({ prefix: "⚠️", label: "MirryKal", suffix: "⚠️", color: "#FFD700", msg });
      break;
    case "error":
      styledLog({ prefix: "❗", label: "MIRRYKAL Loader", suffix: "❗", color: "#FF334B", msg });
      break;
    case "success":
      styledLog({ prefix: "🚀", label: "MIRRYKAL Loader", suffix: "🚀", color: "#32CD32", msg });
      break;
    default:
      styledLog({ prefix: "🔷", label: "Mirrykal Loader", suffix: "🔷", color: "#33ffc9", msg });
      break;
  }
};
