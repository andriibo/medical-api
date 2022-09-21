class CatDto {
    name: string;
    age: number;
    breed: string;
}

export class CreateCatDto extends CatDto {
}

export class UpdateCatDto extends CatDto {
}