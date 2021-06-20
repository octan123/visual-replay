import { openSource } from '../connect';
import { addDataArgs, addMetadataArg, addCondensedArg } from '../commonargs';
import { XVIZSessionValidator } from '@xviz/schema';
import { default as indentString } from 'indent-string';
import { default as Table } from 'cli-table3';
import { default as colors } from 'colors';
export function validateArgs(inArgs) {
  return inArgs.command('validate <host> [log]', 'Validate XVIZ data and message flow', function (args) {
    addDataArgs(args);
    addMetadataArg(args, 'Just check the metadata');
    addCondensedArg(args, 'Display summary information');
    args.options('type', {
      alias: 't',
      describe: 'Just report on this type'
    });
  }, function (args) {
    command(args);
  });
}
export function command(args) {
  var options = {
    verbose: !args.condensed
  };

  if (!args.condensed) {
    options.invalidCallback = function (t, e, m) {
      printValidationError(t, e, m, args);
    };
  }

  var validator = new XVIZSessionValidator(options);
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
  openSource(args, stack);
}

function printErrorSummary(stats, args) {
  var table = new Table({
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
          coloredRow.push(colors.red.bold(e));
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
    var msgStr = indentString(JSON.stringify(msg, null, 4), 4);
    var errStr = indentString(err.toString(), 4);
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