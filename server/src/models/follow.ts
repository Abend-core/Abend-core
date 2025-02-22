import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { User } from "../models/user";

interface FollowAttributes {
    UserId: string;
    UserIdFollow: string;
}

interface FollowCreationAttributes
    extends Optional<FollowAttributes, "UserId"> {}

class Follow
    extends Model<FollowAttributes, FollowCreationAttributes>
    implements FollowAttributes
{
    public UserId!: string;
    public UserIdFollow!: string;

    public static initialize(sequelize: Sequelize) {
        Follow.init(
            {
                UserId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: "Users",
                        key: "id",
                    },
                },
                UserIdFollow: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: "Users",
                        key: "id",
                    },
                },
            },
            {
                sequelize,
                modelName: "Follow",
                tableName: "Follows",
                timestamps: true,
            }
        );
    }
    public static setupAssociations() {
        //Jointure pour l'utilisateur UserId
        User.hasMany(Follow, { foreignKey: "UserId", as: "following" });
        Follow.belongsTo(User, { foreignKey: "UserId", as: "follower" });

        //Jointure pour l'utilisateur UserIdFollow
        User.hasMany(Follow, { foreignKey: "UserIdFollow", as: "followers" });
        Follow.belongsTo(User, { foreignKey: "UserIdFollow", as: "followed" });
    }
}
export default Follow;
