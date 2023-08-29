import { presentMessage } from "../utils/validate";
import { Response } from "express";

import PensionFunds, { pensionFundInput } from "../schema/pensionFunds.schema";
import Investments from "../schema/investments.schema";
import sequelize from "../utils/sequelize";

export class PensionFundsService {
  async fetchAll(res: Response) {
    try {
      let records: any = await PensionFunds.findAll();

      //add fund Assets
      let arrRecord = [];
      for (let record of records) {
        let invRecord: number = await Investments.sum("investmentAmount", {
          where: { fundId: record.fundId },
        });

        console.log(invRecord, "investmentAmount");
        record = record.get();
        arrRecord.push({
          ...record,
          fundAssets: invRecord,
        });
      }

      return presentMessage(res, 200, arrRecord, "Record Fetched");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async fetchAllActive(res: Response) {
    try {
      let records: any = await PensionFunds.findAll({
        where: { status: "Active" },
      });

      //add fund Assets
      let arrRecord = [];
      for (let record of records) {
        let invRecord: number = await Investments.sum("investmentAmount", {
          where: { fundId: record.fundId },
        });

        console.log(invRecord, "investmentAmount");
        record = record.get();
        arrRecord.push({
          ...record,
          fundAssets: invRecord,
        });
      }

      return presentMessage(res, 200, arrRecord, "Record Fetched");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async fetchFundInv(res: Response) {
    try {
      let recordsFunds: any = await PensionFunds.findAll();
      let records: any = await Investments.findAll({
        attributes: [
          "fundId",
          [sequelize.fn("COUNT", sequelize.col("fundId")), "count"],
        ],
        group: "fundId",
      });

      //add fund Assets
      let arrRecord = [];
      for (let record of records) {
        let invRecord: any = recordsFunds.find(
          (el: any) => el.fundId === record.fundId
        );

        record = record.get();
        arrRecord.push({
          ...record,
          fundName: invRecord?.fundName,
        });
      }

      return presentMessage(res, 200, arrRecord, "Record Fetched");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async add(res: Response, input: pensionFundInput) {
    try {
      const { fundName, fundType, fundStartDate, status } = input;

      await PensionFunds.create({
        fundName,
        fundType,
        fundStartDate,
        status,
      });
      // newRecord = newRecord.get();

      return presentMessage(res, 201, null, "Record Created");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async update(res: Response, input: pensionFundInput) {
    try {
      const { fundName, fundType, fundStartDate, status, fundId } = input;

      await PensionFunds.update(
        { fundName, fundType, fundStartDate, status },
        {
          where: {
            fundId,
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
      await PensionFunds.destroy({
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
