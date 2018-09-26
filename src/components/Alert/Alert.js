import { Position, Toaster } from "@blueprintjs/core";
 
export const Alert = Toaster.create({
    className: 'recipe-toaster',
    position: Position.TOP,
});
