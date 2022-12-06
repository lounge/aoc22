use std::fs;
use itertools::Itertools;

fn main() {
    fn get_pos(contents: &String, msg_count: usize) -> usize  {
        for (i, _) in contents.chars().enumerate() {
            let chunk = &contents.get(i..i+msg_count).expect("Chunk should not be Empty");
            if chunk.chars().unique().count() == msg_count {
                return &i + msg_count;
            }                 
        }
        return 0;
    }

    let contents = fs::read_to_string("input_01.txt").expect("File should be read");

    println!("q1: {}", get_pos(&contents, 4));
    println!("q2: {}", get_pos(&contents, 14));
}