import sql from 'better-sqlite3'
import slugify from "slugify";
import xss from "xss";
import fs from 'node:fs';

const db = sql('meals.db');

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        // 저장이 완료되면 실행되는 callback
        if (error) {
            throw new Error('Saving image failed!');
        }
    });

    meal.image = `/images/${fileName}`;

    db.prepare(`
        INSERT INTO MEALS(TITLE, SUMMARY, INSTRUCTIONS, CREATOR, CREATOR_EMAIL, IMAGE, SLUG)
        VALUES (@title,
                @summary,
                @instructions,
                @creator,
                @creator_email,
                @image,
                @slug)
    `).run(meal);
}

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    //throw new Error("Error Test")
    return db.prepare('SELECT * FROM MEALS').all();
}

export async function getMeal(slug) {
    return db.prepare('SELECT * FROM MEALS WHERE SLUG = ?').get(slug);
}
