"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateArgs = validateArgs;
exports.command = command;

var _connect = require("../connect");

var _commonargs = require("../commonargs");

var _schema = require("@xviz/schema");

var _indentString = _interopRequireDefault(require("indent-string"));

var _cliTable = _interopRequireDefault(require("cli-table3"));

var _colors = _interopRequireDefault(require("colors"));

function validateArgs(inArgs) {
  return inArgs.command('validate <host> [log]', 'Validate XVIZ data and message flow', function (args) {
    (0, _commonargs.addDataArgs)(args);
    (0, _commonargs.addMetadataArg)(args, 'Just check the metadata');
    (0, _commonargs.addCondensedArg)(args, 'Display summary information');
    args.options('type', {
      alias: 't',
      describe: 'Just report on this type'
    });
  }, function (args) {
    command(args);
  });
}

function command(args) {
  var options = {
    verbose: !args.condensed
  };

  if (!args.condensed) {
    options.invalidCallback = function (t, e, m) {
      printValidationError(t, e, m, args);
    };
  }

  var validator = new _schema.XVIZSessionValidator(options);
  var printed = false;

  var printSummary = function printSummary() {
    if (!printed) {
      printErrorSummary(validator.stats, args);
      printed = true;
    }
  };

  var reportValidation = {
    onMetadata: function onMetadata(msg) {
      if (args.metadata) {
        printSummary();
      }
    },
    onTransformLogDone: function onTransformLogDone(msg) {
      printSummary();
    },
    onClose: function onClose() {
      printSummary();
    }
  };
  var stack = [validator, reportValidation];
  (0, _connect.openSource)(args, stack);
}

function printErrorSummary(stats, args) {
  var table = new _cliTable["default"]({
    head: ['Type', 'Count', 'Invalid', 'Inv %', 'Unique Errors'],
    style: {
      head: ['white', 'bold']
    }
  });

  for (var message in stats.messages) {
    var count = stats.messages[message] || 0;
    var errors = stats.validationErrors[message] || 0;
    var errPer = errors / count * 100;
    var uniqueErrors = stats.uniqueErrors[message];
    var uniqueErrorCount = uniqueErrors ? Object.keys(uniqueErrors).length : 0;
    var row = [message, count, errors, errPer.toFixed(1), uniqueErrorCount];

    if (errors) {
      (function () {
        var coloredRow = [];
        row.forEach(function (e) {
          coloredRow.push(_colors["default"].red.bold(e));
        });
        table.push(coloredRow);
      })();
    } else {
      table.push(row);
    }
  }

  console.log(table.toString());
}

function printValidationError(msgType, err, msg, args) {
  if (msg && displayType(msgType, args)) {
    var msgStr = (0, _indentString["default"])(JSON.stringify(msg, null, 4), 4);
    var errStr = (0, _indentString["default"])(err.toString(), 4);
    console.log("VALIDATION ERROR:\n  TYPE: ".concat(msgType, "\n  DETAILS:\n").concat(errStr, "\n  MSG:\n").concat(msgStr));
  }
}

function displayType(msgType, args) {
  var display = true;

  if (args.type && args.type.toLowerCase() !== msgType.toLowerCase()) {
    display = false;
  }

  return display;
}
//# sourceMappingURL=validate.js.map