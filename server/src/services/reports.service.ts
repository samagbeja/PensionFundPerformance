import { presentMessage } from "../utils/validate";
import { Response } from "express";

import Reports, { ReportsInput } from "../schema/reports.schema";

export class ReportsService {
  async fetchAll(res: Response) {
    try {
      let records: any = await Reports.findAll();
      let arrRecord = [];
      for (let record of records) {
        record = record.get();
        arrRecord.push({
          ...record,
        });
      }
      return presentMessage(res, 200, arrRecord, "Record Fetched");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async add(res: Response, input: ReportsInput) {
    try {
      const { reportType, reportDate, reportFilePath } = input;

      let newRecord: any = await Reports.create({
        reportType,
        reportDate,
        reportFilePath,
      });
      newRecord = newRecord.get();

      return presentMessage(res, 201, newRecord, "Record Created");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async update(res: Response, input: ReportsInput) {
    try {
      const { reportId, reportType, reportDate, reportFilePath } = input;

      await Reports.update(
        {
          reportType,
          reportDate,
          reportFilePath,
        },
        {
          where: {
            reportId,
          },
        }
      );

      return presentMessage(res, 200, null, "Record successfully updated");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async delete(res: Response, id: string | number) {
    try {
      await Reports.destroy({
        where: {
          reportId: id,
        },
      });

      return presentMessage(res, 200, null, "Record successfully deleted");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }
}
