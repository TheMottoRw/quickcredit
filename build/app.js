"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./routes/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = process.env.PORT || 3000;
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_routes["default"]);
app.listen(PORT, function () {
  console.log("Quickcredit app started on http://localhost:".concat(PORT, "; press Ctrl-C to terminate."));
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map