import { DrawParameters } from "../../core/draw_parameters";
import { types } from "../../savegame/serialization";
import { BaseItem, enumItemType } from "../base_item";
import { ShapeDefinition } from "../shape_definition";
import { THEME } from "../theme";

export class ShapeItem extends BaseItem {
    static getId() {
        return "shape";
    }

    static getSchema() {
        return types.string;
    }

    serialize() {
        return this.definition.getHash();
    }

    deserialize(data) {
        this.definition = ShapeDefinition.fromShortKey(data);
    }

    getItemType() {
        return enumItemType.shape;
    }

    /**
     * @param {BaseItem} other
     */
    equalsImpl(other) {
        return this.definition.getHash() === /** @type {ShapeItem} */ (other).definition.getHash();
    }

    /**
     * @param {ShapeDefinition} definition
     */
    constructor(definition) {
        super();

        /**
         * This property must not be modified on runtime, you have to clone the class in order to change the definition
         */
        this.definition = definition;
    }

    getBackgroundColorAsResource() {
        return THEME.map.resources.shape;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {DrawParameters} parameters
     * @param {number=} diameter
     */
    drawCentered(x, y, parameters, diameter) {
        this.definition.drawCentered(x, y, parameters, diameter);
    }
}
