import { presentMessage } from "../utils/validate";
import { Response } from "express";

import Reports from "../schema/reports.schema";
import Users from "../schema/users.schema";

import ReportAccess, { ReportAccessInput } from "../schema/reportAccess.schema";

export class ReportAccessService {
  async fetchAll(res: Response) {
    try {
      let records: any = await ReportAccess.findAll();
      let arrRecord = [];
      for (let record of records) {
        let findRecord: any = await Reports.findOne({
          where: { reportId: record.reportId },
        });
        let findRecord2: any = await Users.findOne({
          where: { userId: record.userId },
        });
        record = record.get();
        arrRecord.push({
          ...record,
          reportType: findRecord.reportType,
          username: findRecord2.username,
        });
      }
      return presentMessage(res, 200, arrRecord, "Record Fetched");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async add(res: Response, input: ReportAccessInput) {
    try {
      const { reportId, userId, accessLevel } = input;

      let newRecord: any = await ReportAccess.create({
        reportId,
        userId,
        accessLevel,
      });
      newRecord = newRecord.get();

      return presentMessage(res, 201, newRecord, "Record Created");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async update(res: Response, input: ReportAccessInput) {
    try {
      const { accessId, reportId, userId, accessLevel } = input;

      await ReportAccess.update(
        {
          reportId,
          userId,
          accessLevel,
        },
        {
          where: {
            accessId,
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
      await ReportAccess.destroy({
        where: {
          accessId: id,
        },
      });

      return presentMessage(res, 200, null, "Record successfully deleted");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }
}
