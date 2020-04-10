import {Model } from "sequelize-typescript";

export default function (newTarget:any, self: Model): void {
    // @ts-ignore
    Object.keys(newTarget.rawAttributes).forEach((propertyKey: keyof Model) => {
        Object.defineProperty(self, propertyKey, {
            get() {
                return self.getDataValue(propertyKey);
            },
            set(value) {
                self.setDataValue(propertyKey, value);
            },
        });
    });
}