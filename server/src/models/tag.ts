import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import db from "../database/db";

interface TagAttributes {
    id: number;
    name: string;
}

interface TagCreationAttributes extends Optional<TagAttributes, "id"> {}

class Tag
    extends Model<TagAttributes, TagCreationAttributes>
    implements TagAttributes
{
    public id!: number;
    public name!: string;
}

Tag.init(
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
                    msg: "Le nom du tag ne doit pas être nul.",
                },
                notEmpty: {
                    msg: "Le nom du tag ne doit pas être vide.",
                },
                len: {
                    args: [1, 255],
                    msg: "Trop de caractères, 255 maximum.",
                },
            },
        },
    },
    {
        sequelize: db.abend,
        modelName: "Tag",
        tableName: "Tags",
    }
);

export default Tag;
