import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface TagAttributes {
    id: number;
    name: string;
    uses: number;
}

interface TagCreationAttributes extends Optional<TagAttributes, "id"> {}

class Tag
    extends Model<TagAttributes, TagCreationAttributes>
    implements TagAttributes
{
    public id!: number;
    public name!: string;
    public uses!: number;

    public static initialize(sequelize: Sequelize) {
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
                uses: {
                    type: DataTypes.INTEGER,
                    defaultValue: 0,
                },
            },
            {
                sequelize,
                modelName: "Tag",
                tableName: "Tags",
            }
        );
    }
    public static setupAssociations() {
        // Pas d'associations pour ce modèle
    }
}
export default Tag;
