import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/db";

interface CategoryAttributes {
    id: number;
    name: string;
}

interface CategoryCreationAttributes
    extends Optional<CategoryAttributes, "id"> {}

class Category
    extends Model<CategoryAttributes, CategoryCreationAttributes>
    implements CategoryAttributes
{
    public id!: number;
    public name!: string;
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: "unique_name",
                msg: "Ce nom est déjà utilisé.",
            },
            validate: {
                notNull: {
                    msg: "Le nom de la catégorie ne doit pas être nul.",
                },
                notEmpty: {
                    msg: "Le nom de la catégorie ne doit pas être vide.",
                },
                len: {
                    args: [1, 255],
                    msg: "Trop de caractères, 255 maximum.",
                },
            },
        },
    },
    {
        sequelize,
        modelName: "Category",
        tableName: "Categories",
    }
);

export default Category;
