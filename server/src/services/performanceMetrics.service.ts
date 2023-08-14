import { presentMessage } from "../utils/validate";
import { Response } from "express";

import Investments from "../schema/investments.schema";

import PerformanceMetrics, {
  performanceMetricsInput,
} from "../schema/performanceMetrics";

export class PerformanceMetricsService {
  async fetchAll(res: Response) {
    try {
      let records: any = await PerformanceMetrics.findAll();
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

  async add(res: Response, input: performanceMetricsInput) {
    try {
      const { investmentId, metricName, metricValue, metricDate } = input;

      let newRecord: any = await PerformanceMetrics.create({
        investmentId,
        metricName,
        metricValue,
        metricDate,
      });
      newRecord = newRecord.get();

      return presentMessage(res, 201, newRecord, "Record Created");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async update(res: Response, input: performanceMetricsInput) {
    try {
      const { investmentId, metricName, metricValue, metricDate, metricId } =
        input;

      await PerformanceMetrics.update(
        {
          investmentId,
          metricName,
          metricValue,
          metricDate,
        },
        {
          where: {
            metricId,
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
      await PerformanceMetrics.destroy({
        where: {
          metricId: id,
        },
      });

      return presentMessage(res, 200, null, "Record successfully deleted");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }
}
