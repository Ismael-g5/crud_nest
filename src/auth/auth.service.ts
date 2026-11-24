import { Injectable } from "@nestjs/common";
import { LoginDto } from "./hashing/dto/login.dto";

@Injectable()
export class AuthService{
  async login(loginDto: LoginDto){
    return loginDto
  }
}