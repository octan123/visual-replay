import { openSource } from '../connect';
import { addDataArgs, addMetadataArg, addCondensedArg } from '../commonargs';
import { XVIZSessionValidator } from '@xviz/schema';
import { default as indentString } from 'indent-string';
import { default as Table } from 'cli-table3';
import { default as colors } from 'colors';
export function validateArgs(inArgs) {
  return inArgs.command('validate <host> [log]', 'Validate XVIZ data and message flow', args => {
    addDataArgs(args);
    addMetadataArg(args, 'Just check the metadata');
    addCondensedArg(args, 'Display summary information');
    args.options('type', {
      alias: 't',
      describe: 'Just report on this type'
    });
  }, args => {
    command(args);
  });
}
export function command(args) {
  const options = {
    verbose: !args.condensed
  };

  if (!args.condensed) {
    options.invalidCallback = (t, e, m) => {
      printValidationError(t, e, m, args);
    };
  }

  const validator = new XVIZSessionValidator(options);
  let printed = false;

  const printSummary = () => {
    if (!printed) {
      printErrorSummary(validator.stats, args);
      printed = true;
    }
  };

  const reportValidation = {
    onMetadata: msg => {
      if (args.metadata) {
        printSummary();
      }
    },
    onTransformLogDone: msg => {
      printSummary();
    },
    onClose: () => {
      printSummary();
    }
  };
  const stack = [validator, reportValidation];
  openSource(args, stack);
}

function printErrorSummary(stats, args) {
  const table = new Table({
    head: ['Type', 'Count', 'Invalid', 'Inv %', 'Unique Errors'],
    style: {
      head: ['white', 'bold']
    }
  });

  for (const message in stats.messages) {
    const count = stats.messages[message] || 0;
    const errors = stats.validationErrors[message] || 0;
    const errPer = errors / count * 100;
    const uniqueErrors = stats.uniqueErrors[message];
    const uniqueErrorCount = uniqueErrors ? Object.keys(uniqueErrors).length : 0;
    const row = [message, count, errors, errPer.toFixed(1), uniqueErrorCount];

    if (errors) {
      const coloredRow = [];
      row.forEach(e => {
        coloredRow.push(colors.red.bold(e));
      });
      table.push(coloredRow);
    } else {
      table.push(row);
    }
  }

  console.log(table.toString());
}

function printValidationError(msgType, err, msg, args) {
  if (msg && displayType(msgType, args)) {
    const msgStr = indentString(JSON.stringify(msg, null, 4), 4);
    const errStr = indentString(err.toString(), 4);
    console.log("VALIDATION ERROR:\n  TYPE: ".concat(msgType, "\n  DETAILS:\n").concat(errStr, "\n  MSG:\n").concat(msgStr));
  }
}

function displayType(msgType, args) {
  let display = true;

  if (args.type && args.type.toLowerCase() !== msgType.toLowerCase()) {
    display = false;
  }

  return display;
}
//# sourceMappingURL=validate.js.map