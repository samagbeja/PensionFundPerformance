import 'dotenv/config';
// @ts-ignore
import { createLogger, transports, format } from 'winston';
import moment from 'moment';
import path from 'path';

const { combine, timestamp, simple, printf } = format;
const getFormattedDate = (str: string) => moment().format(str);
const numericDate = getFormattedDate('DD-MM-YYYY');
const [month, year] = [getFormattedDate('MMM'), getFormattedDate('YYYY')];
const logPath = `../../logs/${year}/${month}`;

const logger = createLogger({
	format: combine(
		timestamp({
			format: 'HH:mm:ss',
		}),
		simple(),
		printf(
			(log :any) =>
				`${log.timestamp} ${log.level}: ${
					log.message
				} [${getFormattedDate('DD-MMM-YYYY h:mm:ss A')}]`
		)
	),
	transports: [
		new transports.Console({
			silent: process.env.NODE_ENV === 'production',
			level: 'info',
		}),
		new transports.File({
			filename: path.join(
				__dirname,
				`${logPath}/error(${numericDate}).log`
			),
			level: 'error',
			silent:
				process.env.NODE_ENV !== 'production' &&
				process.env.NODE_ENV !== 'debug',
		}),
	],
});

export default logger;
