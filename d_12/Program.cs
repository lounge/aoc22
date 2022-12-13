using System.Drawing;

const string height = "SabcdefghijklmnopqrstuvwxyzE";
var directions = new List<Size> {
    { new Size(1, 0) },
    { new Size(0, 1) },
    { new Size(0, -1) },
    { new Size(-1, 0) }
};

var Dist = new Dictionary<string, int>();
int rowLength, colLength;

bool IsValid(Point adjCell, Point cell, int[][] heightMap)
{
    if (adjCell.X < 0 || adjCell.Y < 0 || adjCell.Y >= rowLength || adjCell.X >= colLength)
    {
        return false;
    }

    if (heightMap[cell.Y][cell.X] == height.IndexOf("E"))
    {
        return false;
    }

    return heightMap[adjCell.Y][adjCell.X] - heightMap[cell.Y][cell.X] <= 1;
}

void Run(int[][] heightMap, List<Point> startPoints, Point endPoint)
{
    var q = new Queue<Tuple<int, Point>>();
    foreach (var p in startPoints)
    {
        q.Enqueue(new Tuple<int, Point>(0, p));

    }

    while (q.Count != 0)
    {
        var queueItem = q.Dequeue();
        var cell = queueItem.Item2;

        if (Dist.ContainsKey(cell.ToString()))
        {
            continue;
        }

        Dist.Add(cell.ToString(), queueItem.Item1);

        foreach (var dir in directions)
        {
            var adjCell = cell + dir;
            if (!IsValid(adjCell, cell, heightMap))
            {
                continue;
            }
            q.Enqueue(new Tuple<int, Point>(queueItem.Item1 + 1, adjCell));
        }
    }

    Console.WriteLine($"{Dist[endPoint.ToString()]}");
}

void Q1(string[] lines)
{
    var startPoints = new List<Point>();
    var endPoint = new Point();

    var heightMap = new int[lines.Length][];
    for (int row = 0; row < lines.Length; row++)
    {
        heightMap[row] = lines[row].ToCharArray().Select(x => height.IndexOf(x)).ToArray();
        if (heightMap[row].Contains(height.IndexOf("S")))
        {
            startPoints.Add(new Point(Array.IndexOf(heightMap[row], height.IndexOf("S")), row));
            heightMap[startPoints[0].Y][startPoints[0].X] = height.IndexOf("a");
        }
        if (heightMap[row].Contains(height.IndexOf("E")))
        {
            endPoint = new Point(Array.IndexOf(heightMap[row], height.IndexOf("E")), row);
        }
    }
    rowLength = heightMap.Length;
    colLength = heightMap[0].Length;

    Run(heightMap, startPoints, endPoint);
}

void Q2(string[] lines)
{
    var startPoints = new List<Point>();
    var endPoint = new Point();

    var heightMap = new int[lines.Length][];
    for (var row = 0; row < lines.Length; row++)
    {
        heightMap[row] = lines[row].ToCharArray().Select(x => height.IndexOf(x)).ToArray();
        for (var x = 0; x < heightMap[row].Length; x++)
        {
            if (heightMap[row][x] == 1)
            {
                startPoints.Add(new Point(x, row));
            }
            if (heightMap[row].Contains(height.IndexOf("E")))
            {
                endPoint = new Point(Array.IndexOf(heightMap[row], height.IndexOf("E")), row);
            }
        }
    }
    rowLength = heightMap.Length;
    colLength = heightMap[0].Length;

    Run(heightMap, startPoints, endPoint);
}

var lines = File.ReadAllLines("input_01.txt");

Q1(lines);
Q2(lines);

Console.ReadLine();

