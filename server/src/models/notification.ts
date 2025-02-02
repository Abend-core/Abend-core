import { DataTypes, Model, Optional } from "sequelize";
import db from "../database/db";

interface NotificationAttributes {
    id: number;
    type: string;
    content: string;
    id_user: string;
}

interface NotificationCreationAttributes
    extends Optional<NotificationAttributes, "id"> {}

class Notification
    extends Model<NotificationAttributes, NotificationCreationAttributes>
    implements NotificationAttributes
{
    public id!: number;
    public type!: string;
    public content!: string;
    public id_user!: string;
}

Notification.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Le type ne doit pas être nul.",
                },
                notEmpty: {
                    msg: "Le type ne doit pas être vide.",
                },
                len: {
                    args: [1, 255],
                    msg: "Trop de caractères, 255 maximum.",
                },
            },
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Le content ne doit pas être nul.",
                },
                notEmpty: {
                    msg: "Le content ne doit pas être vide.",
                },
                len: {
                    args: [1, 255],
                    msg: "Trop de caractères, 255 maximum.",
                },
            },
        },
        id_user: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "Users",
                key: "id",
            },
        },
    },
    {
        sequelize: db.abend,
        modelName: "Notification",
        tableName: "Notifications",
    }
);

export default Notification;
