import { Op } from "sequelize";
import Users, { signInInput, userInput } from "../schema/users.schema";
import { presentMessage } from "../utils/validate";
import { Response } from "express";
import { signJwt } from "../utils/jwt";

export class UserService {
  async signup(res: Response, input: userInput) {
    try {
      const { username, email, userType, password } = input;
      //fetch if user is already existing
      const existingUser = await Users.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });
      if (existingUser) {
        return presentMessage(res, 401, null, "User already exists");
      } else {
        let newUser: any = await Users.create({
          username,
          email,
          userType,
          password,
        });
        newUser = newUser.get();
        console.log("newUser", newUser);

        newUser.password = undefined;
        const token: string = signJwt(newUser);

        res.cookie("accessToken", token, {
          httpOnly: true,
          secure: true,
        });

        return presentMessage(res, 201, newUser, "User Created");
      }
    } catch (err) {
      return presentMessage(res, 500, null, "Unexpected Server Error" + err);
    }
  }

  async signin(res: Response, input: signInInput) {
    try {
      const { username, password } = input;
      //fetch if user is already existing
      let existingUser: any = await Users.findOne({
        where: {
          [Op.or]: [{ username }, { email: username }],
        },
      });
      if (!existingUser) {
        return presentMessage(res, 401, null, "User does not exist");
      } else {
        let valid: boolean = existingUser.authenticate(password);

        if (valid) {
          existingUser = existingUser.get();
          existingUser.password = undefined;
          const token: string = signJwt(existingUser);

          res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
          });
          return presentMessage(res, 200, existingUser, "Sign in successfully");
        } else {
          return presentMessage(res, 400, null, "Invalid username or password");
        }
      }
    } catch {
      return presentMessage(res, 500, null, "Unexpected Server Error");
    }
  }
}
