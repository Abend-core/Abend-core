import { DataTypes, Model } from "sequelize";
import db from "../database/db";

import Tag from "../models/tag";
import { Module } from "../models/module";

// Interface des attributs de Tagged
interface TaggedAttributes {
    TagId: string;
    ModuleId: string;
}

// Définition du modèle avec TypeScript
class Tagged extends Model<TaggedAttributes> implements TaggedAttributes {
    public TagId!: string;
    public ModuleId!: string;
}

Tagged.init(
    {
        TagId: {
            type: DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: "Tag",
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
        sequelize: db.abend,
        modelName: "Tagged",
        tableName: "Tagged",
        timestamps: true,
    }
);

// Jointure pour TagId
Tag.belongsToMany(Module, {
    through: Tagged,
    foreignKey: "TagId",
    as: "taggedModules",
});

// Jointure pour ModuleId
Module.belongsToMany(Tag, {
    through: Tagged,
    foreignKey: "ModuleId",
    as: "taggedByTag",
});

export default Tagged;
