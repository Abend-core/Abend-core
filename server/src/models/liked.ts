import { Sequelize, DataTypes, Model } from "sequelize";
import { User } from "../models/user";
import { Module } from "../models/module";

interface LikedAttributes {
    UserId: string;
    ModuleId: string;
}

class Liked extends Model<LikedAttributes> implements LikedAttributes {
    public UserId!: string;
    public ModuleId!: string;

    public static initialize(sequelize: Sequelize) {
        Liked.init(
            {
                UserId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: "Users",
                        key: "id",
                    },
                },
                ModuleId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: "Modules",
                        key: "id",
                    },
                },
            },
            {
                sequelize,
                modelName: "Liked",
                tableName: "Likes",
                timestamps: true,
            }
        );
    }

    public static setupAssociations() {
        // Jointure pour UserId
        User.belongsToMany(Module, {
            through: Liked,
            foreignKey: "UserId",
            as: "likedModules",
        });

        // Jointure pour ModuleId
        Module.belongsToMany(User, {
            through: Liked,
            foreignKey: "ModuleId",
            as: "likedByUsers",
        });
    }
}
export default Liked;
