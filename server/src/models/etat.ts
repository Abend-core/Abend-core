import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/db";

interface EtatAttributes {
    id: number;
    name: string;
}

interface EtatCreationAttributes extends Optional<EtatAttributes, "id"> {}

class Etat
    extends Model<EtatAttributes, EtatCreationAttributes>
    implements EtatAttributes
{
    public id!: number;
    public name!: string;
}

Etat.init(
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
                    msg: "L'etat ne doit pas être nul.",
                },
                notEmpty: {
                    msg: "L'etat ne doit pas être vide.",
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
        modelName: "Etat",
        tableName: "Etats",
    }
);

export default Etat;
