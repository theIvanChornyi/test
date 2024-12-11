import { FRONT_ROUTES } from "../../shared/routes";

export interface IWidget {
  ico: string;
  name: string;
  href: keyof typeof FRONT_ROUTES
}