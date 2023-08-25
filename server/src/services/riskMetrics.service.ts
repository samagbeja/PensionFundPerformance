import { presentMessage } from "../utils/validate";
import { Response } from "express";

import Investments from "../schema/investments.schema";

import RiskMetrics, { RiskMetricsInput } from "../schema/riskMetrics.schema";

export class RiskMetricsService {
  async fetchAll(res: Response) {
    try {
      let records: any = await RiskMetrics.findAll();
      let arrRecord = [];
      for (let record of records) {
        let findRecord: any = await Investments.findOne({
          where: { investmentId: record.investmentId },
        });
        record = record.get();
        arrRecord.push({
          ...record,
          investmentName: findRecord.investmentName,
        });
      }
      return presentMessage(res, 200, arrRecord, "Record Fetched");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async add(res: Response, input: RiskMetricsInput) {
    try {
      const { investmentId, riskCategory, riskIndicator, riskLevel, riskDate } =
        input;

      let newRecord: any = await RiskMetrics.create({
        investmentId,
        riskCategory,
        riskIndicator,
        riskLevel,
        riskDate,
      });
      newRecord = newRecord.get();

      return presentMessage(res, 201, newRecord, "Record Created");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async update(res: Response, input: RiskMetricsInput) {
    try {
      const {
        riskId,
        investmentId,
        riskCategory,
        riskIndicator,
        riskLevel,
        riskDate,
      } = input;

      await RiskMetrics.update(
        {
          investmentId,
          riskCategory,
          riskIndicator,
          riskLevel,
          riskDate,
        },
        {
          where: {
            riskId,
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
      await RiskMetrics.destroy({
        where: {
          riskId: id,
        },
      });

      return presentMessage(res, 200, null, "Record successfully deleted");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }
}
