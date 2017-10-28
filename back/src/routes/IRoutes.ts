import { Router } from 'express'

export interface IRoutes{
    readonly prefix: string;
    CreateRoutes(router: Router): void;
}