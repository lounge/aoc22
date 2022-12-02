open System.IO
open System

let split (separators: string) (x: string) = x.Split(separators)

let parse (input: string[]) =
    input
    |> String.concat "|"
    |> split "||"
    |> Seq.map (split "|")
    |> Seq.map (fun x -> x |> Seq.map int)

let q1 (input: string[]) =
    let elfs = input |> parse
    let cals = elfs |> Seq.map Seq.sum
    let maxCals = cals |> Seq.max

    maxCals

let q2 (input: string[]) =
    let elfs = input |> parse
    let cals = elfs |> Seq.map Seq.sum
    let maxCals =
        cals
        |> Seq.sortDescending
        |> Seq.take 3
        |> Seq.sum

    maxCals

let input = File.ReadAllLines("input_01.txt")

let result1 = input |> q1
Console.WriteLine(result1)

let result2 = input |> q2
Console.WriteLine(result2)