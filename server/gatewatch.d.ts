declare module "gatewatch" {
    export class AccessControl {
      constructor(policy: Object);
      enforce(): AccessControl;


    }
    export class GrantQuery {
        policy: Object;
        query: Object;
        constructor(policy: Object);
        role(roleName : string): GrantQuery;
        on(resources: Array<string>): this;
        can(actions: Array<string>): this;
        or(or : boolean): this;
        and(and :boolean): this;
        grant(): boolean;
    }
}