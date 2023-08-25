import { presentMessage } from "../utils/validate";
import { Response } from "express";

import CommunicationChannels, {
  CommunicationChannelsInput,
} from "../schema/communicationChannels.schema";

export class CommunicationChannelsService {
  async fetchAll(res: Response) {
    try {
      let records: any = await CommunicationChannels.findAll();

      //add fund Assets
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

  async add(res: Response, input: CommunicationChannelsInput) {
    try {
      const { channelName, channelType } = input;

      await CommunicationChannels.create({
        channelName,
        channelType,
      });
      // newRecord = newRecord.get();

      return presentMessage(res, 201, null, "Record Created");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async update(res: Response, input: CommunicationChannelsInput) {
    try {
      const { channelId, channelName, channelType } = input;

      await CommunicationChannels.update(
        { channelName, channelType },
        {
          where: {
            channelId,
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
      await CommunicationChannels.destroy({
        where: {
          channelId: id,
        },
      });

      return presentMessage(res, 200, null, "Record successfully deleted");
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }
}
