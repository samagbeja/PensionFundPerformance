import { presentMessage } from "../utils/validate";
import { Response } from "express";

import Investments, { investmentInput } from "../schema/investments.schema";

export class InvestmentsService {
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
}
