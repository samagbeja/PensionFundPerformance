import { presentMessage } from "../utils/validate";
import { Response } from "express";

import Stakeholders, { StakeholdersInput } from "../schema/stakeholders.schema";

export class StakeholdersService {
  async fetchAll(res: Response) {
    try {
      let records: any = await Stakeholders.findAll();
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

  async add(res: Response, input: StakeholdersInput) {
    try {
      const {
        stakeholderType,
        stakeholderName,
        stakeholderEmail,
        registrationDate,
      } = input;

      let newRecord: any = await Stakeholders.create({
        stakeholderType,
        stakeholderName,
        stakeholderEmail,
        registrationDate,
      });
      newRecord = newRecord.get();

      return presentMessage(res, 201, newRecord, "Record Created");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async update(res: Response, input: StakeholdersInput) {
    try {
      const {
        stakeholderId,
        stakeholderType,
        stakeholderName,
        stakeholderEmail,
        registrationDate,
      } = input;

      await Stakeholders.update(
        {
          stakeholderType,
          stakeholderName,
          stakeholderEmail,
          registrationDate,
        },
        {
          where: {
            stakeholderId,
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
      await Stakeholders.destroy({
        where: {
          stakeholderId: id,
        },
      });

      return presentMessage(res, 200, null, "Record successfully deleted");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }
}
