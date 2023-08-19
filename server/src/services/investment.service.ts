import { presentMessage } from "../utils/validate";
import { Response } from "express";

import Investments, { investmentInput } from "../schema/investments.schema";
import PensionFunds from "../schema/pensionFunds.schema";

export class InvestmentsService {
  async fetchAll(res: Response) {
    try {
      let records: any = await Investments.findAll();
      let arrRecord = [];
      for (let record of records) {
        let fundRecord: any = await PensionFunds.findOne({
          where: { fundId: record.fundId },
        });
        record = record.get();
        arrRecord.push({
          ...record,
          fundName: fundRecord.fundName,
        });
      }
      return presentMessage(res, 200, arrRecord, "Record Fetched");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async add(res: Response, input: investmentInput) {
    try {
      const {
        fundId,
        investmentName,
        investmentType,
        investmentSector,
        investmentAmount,
        investmentStartDate,
        investmentEndDate,
      }: investmentInput = input;

      let newRecord: any = await Investments.create({
        fundId,
        investmentName,
        investmentType,
        investmentSector,
        investmentAmount,
        investmentStartDate,
        investmentEndDate,
      });
      newRecord = newRecord.get();

      return presentMessage(res, 201, newRecord, "Record Created");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async update(res: Response, input: investmentInput) {
    try {
      const {
        fundId,
        investmentName,
        investmentType,
        investmentSector,
        investmentAmount,
        investmentStartDate,
        investmentEndDate,
        investmentId,
      } = input;

      await Investments.update(
        {
          fundId,
          investmentName,
          investmentType,
          investmentSector,
          investmentAmount,
          investmentStartDate,
          investmentEndDate,
        },
        {
          where: {
            investmentId,
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
      await Investments.destroy({
        where: {
          fundId: id,
        },
      });

      return presentMessage(res, 200, null, "Record successfully deleted");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }
}
