import classes from './page.module.css'
import Link from "next/link";
import MealsGrid from "@/app/components/meals/meals-grid";
import {getMeals} from "@/lib/meal";
import {Suspense} from "react";
import LoadingOut from "@/app/meals/loading-out";

async function Meals() {
    const meals = await getMeals();
    return <MealsGrid meals={meals}/>
}

export default async function MealsPage(){

    return <>
        <header className={classes.header}>
            <h1>Delicious meals. created <span className={classes.highlight}>by you</span></h1>
            <p>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
            <p className={classes.cta}>
                <Link href={"/meals/share"}>
                    Share Youre Favorite Recipe
                </Link>
            </p>
        </header>
        <main className={classes.main}>
            <Suspense fallback={<LoadingOut/>}>
                <Meals/>
            </Suspense>
        </main>
    </>
}
