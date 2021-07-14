import { classToClass, plainToClass } from 'class-transformer';
export class ResponseUserDto {
  success: boolean;
  data: any;
  public static factory(success: boolean, data: any): ResponseUserDto {
    const resultDataDto = plainToClass(
      ResponseUserDto,
      { success, data },
      {
        ignoreDecorators: true,
      },
    );
    return classToClass(resultDataDto);
  }
}
