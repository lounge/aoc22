use std::fs;
use itertools::Itertools;

fn main() {
    fn get_pos(msg_count: usize) -> usize  {
        let mut size = 0;
        let contents = fs::read_to_string("input_01.txt").expect("File should be read");

        for (i, _) in contents.chars().enumerate() {
            let chunk = &contents.get(i..i+msg_count).expect("Chunk should not be Empty");
            if chunk.chars().unique().count() == msg_count {
                size = &i + msg_count;
                break;
            }                 
        }
        size
    }

    println!("q1: {}", get_pos(4));
    println!("q2: {}", get_pos(14));
}