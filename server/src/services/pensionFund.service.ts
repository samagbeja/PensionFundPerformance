import { presentMessage } from "../utils/validate";
import { Response } from "express";

import PensionFunds, { pensionFundInput } from "../schema/pensionFunds.schema";

export class PensionFundsService {
  async add(res: Response, input: pensionFundInput) {
    try {
      const { fundName, fundType, fundAssets, fundStartDate, status } = input;

      let newRecord: any = await PensionFunds.create({
        fundName,
        fundType,
        fundAssets,
        fundStartDate,
        status,
      });
      newRecord = newRecord.get();

      return presentMessage(res, 201, newRecord, "Record Created");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async fetchAll(res: Response) {
    try {
      let records: any = await PensionFunds.findAll();

      return presentMessage(res, 201, records, "Record Created");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }
}
