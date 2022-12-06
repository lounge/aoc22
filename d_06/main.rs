use std::fs;
use itertools::Itertools;

fn main() {
    const START_COUNT: usize = 4;
    const MSG_COUNT: usize = 14;

    let contents = fs::read_to_string("input_01.txt").expect("File should be read");

    for (i, _) in contents.chars().enumerate() {
        let chunk = &contents.get(i..i+START_COUNT).expect("Chunk should not be Empty");
        if chunk.chars().unique().count() == START_COUNT {
            println!("q1: {}", &i + START_COUNT);
            break;
        }                 
    }
    for (i, _) in contents.chars().enumerate() {
        let chunk = &contents.get(i..i+MSG_COUNT).expect("Chunk should not be Empty");
        if chunk.chars().unique().count() == MSG_COUNT {
            println!("q2: {}", &i + MSG_COUNT);
            break;
        }                 
    }
}