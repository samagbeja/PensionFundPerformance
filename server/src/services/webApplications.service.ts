import { presentMessage } from "../utils/validate";
import { Response } from "express";

import WebApplications, {
  WebApplicationsInput,
} from "../schema/webApplications.schema";

export class WebApplicationsService {
  async fetchAll(res: Response) {
    try {
      let records: any = await WebApplications.findAll();
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

  async add(res: Response, input: WebApplicationsInput) {
    try {
      const { appName, appDescription, appVendor, status, integrationDate } =
        input;

      let newRecord: any = await WebApplications.create({
        appName,
        appDescription,
        appVendor,
        status,
        integrationDate,
      });
      newRecord = newRecord.get();

      return presentMessage(res, 201, newRecord, "Record Created");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async update(res: Response, input: WebApplicationsInput) {
    try {
      const {
        appId,
        appName,
        appDescription,
        appVendor,
        status,
        integrationDate,
      } = input;

      await WebApplications.update(
        {
          appName,
          appDescription,
          appVendor,
          status,
          integrationDate,
        },
        {
          where: {
            appId,
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
      await WebApplications.destroy({
        where: {
          appId: id,
        },
      });

      return presentMessage(res, 200, null, "Record successfully deleted");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }
}
