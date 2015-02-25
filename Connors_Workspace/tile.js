//----------------------------------------
//  Tile Engine Class
//----------------------------------------

//The TileEngine will handle the storage and drawing
//  of a series of tiles denoting the world. Each cell
//  will point to a Tile (a square image used to 
//  represent this cell when drawing), as well as be
//  able to discern if a point (x, y) is inside of it.


var TileEngine = function(columns, rows, cellSize) {
    //Assumes cellSize is the same as the Tile image
    //  sizes to be loaded later. This may be updated
    //  later if it's decided we need to figure out
    //  how to scale.
    
    //denotes the current sea level of the world
    this.sea_level = 0;
    
    
    this.columns = columns;
    this.rows = rows;
    //Denotes the amount of columns and rows in the
    //  tileMap.
    
    this.cellSize = cellSize;
    //Denotes the expected size (width and height) of 
    //  the image and thus the size of the tile drawn 
    //  per cell.
    
    this.tileDictionary = [];
    //Denotes the mapping of integers to Tiles (images)
    //  for use by the cells in our TileEngine.
    
    this.tileCount = 0;
    //Denotes the amount of Tiles loaded into the 
    //  tileDictionary.
    
    this.tileMap = [];
    //This double array holds all of the cells. The first
    //  index denotes the x position of the cell returned,
    //  and the second index denotes the y position of the
    //  cell returned. Thus, the max number for the first
    //  index = this.columns - 1, and the max number for
    //  the second index = this.rows - 1.
    for (var col = 0; col < this.columns; ++col) {
        var tileColumn = [];
        for (var row = 0; row < this.rows; ++row) {
            var defaultCell = {
                x: col,
                y: row,
                tile: -1,
                elevation: islandHeights[col][row],
                danger : false,
                fooded : false
            };
            //Default cell definition defined here. (x, y)
            //  simply denotes the position of this cell.
            //  tile is set to null initially (null == -1),
            //  and should be set to the desired tile via
            //  the tileDictionary. elevation denotes the
            //  height of this tile.
            
            tileColumn.push(defaultCell);
        }
        this.tileMap.push(tileColumn);
    }
    
};

//propagateDanger will accept a tile {x, y} as argument
//and appropriately flag any exisitng adjacent tiles 
//as being in danger.
TileEngine.prototype.propagateDanger = function(tile) {
	//look at adjacent tiles in tilemap
	//8 tiles to check
	//tile has flooded;
	
	var xsub1 = tile.x - 1;
	var xadd1 = tile.x + 1;
	var ysub1 = tile.y - 1;
	var yadd1 = tile.y + 1;
	
	if ( xsub1 >= 0) {
		if ( ysub1 >= 0 )
			this.tileMap[xsub1][ysub1].danger = true;
		if ( yadd1 < this.tileMap[xsub1].length )
			this.tileMap[xsub1][yadd1].danger = true;
		this.tileMap[xsub1][tile.y].danger = true;
	}
	
	if ( xadd1 < this.tileMap.length ) {
		if ( ysub1 >= 0 )
			this.tileMap[xadd1][ysub1].danger = true;
		if ( yadd1 < this.tileMap[xadd1].length )
			this.tileMap[xadd1][yadd1].danger = true;
		this.tileMap[xadd1][tile.y].danger = true;
	}
	
	if ( yadd1 < this.tileMap[tile.x].length )
		this.tileMap[tile.x][yadd1].danger = true;
		
	if ( ysub1 >= 0 )
		this.tileMap[tile.x][ysub1].danger = true;
}


TileEngine.prototype.loadTile = function(image){
    //Adds an image to the tileDictionary for use by the 
    //  TileEngine. Returns the integer the image was 
    //  assigned, which will be the next unused integer.
    //  Since image loading takes time, this should occur
    //  before the tileImage is used.
    //Assumes filename is a valid path to an image.
    
    this.tileDictionary[this.tileCount] = image;
    ++this.tileCount;
    return this.tileCount - 1;
};


TileEngine.prototype.getCell = function(cell) {
    //If x and y are within the bounds of the tileMap,
    //  returns the cell at that position in the array.
    //  Returns false otherwise.
    if ((cell.x >= 0) && (cell.x < this.columns) &&
        (cell.y >= 0) && (cell.y < this.rows)) {
        return this.tileMap[cell.x][cell.y];
    } else {
        return false;
    }
};


TileEngine.prototype.posToCell = function(pos) {
    //Returns the cell containing pos on the pixel scale
    //  given that (0, 0) is the top-left pixel in the
    //  top left cell. Returns false if pos lies outside
    //  of the tileMap.
    if ((pos.x >= 0) && (pos.x < this.columns * this.cellSize) &&
        (pos.y > -0) && (pos.y < this.rows * this.cellSize)) {
        var x = Math.floor(pos.x / this.cellSize);
        var y = Math.floor(pos.y / this.cellSize);
        return this.tileMap[x][y];
    } else {
        return false;
    }
};


TileEngine.prototype.cellToPos = function (cell) {
    //Returns the position of the top left of cell. If the
    //  given cell is out of bounds, returns false.
    if ((cell.x >= 0) && (cell.x < this.columns) &&
        (cell.y >= 0) && (cell.y < this.rows)) {
        var pos = {x: cell.x * this.cellSize, y: cell.y * this.cellSize};
        return pos;
    } else {
        return false;
    }
};


TileEngine.prototype.drawCell = function(pos, cell) {
    //Draws the cell at (cell.x, cell.y) on the canvas at
    //  (pos.x, pos.y).
    var Tile = this.tileMap[cell.x][cell.y].tile;
        if (Tile != -1)
            context.drawImage(this.tileDictionary[Tile], pos.x, pos.y, this.cellSize, this.cellSize);
};


TileEngine.prototype.drawSection = function(pos, startDraw, endDraw) {
    //Draws the cells that (even partially) fall within the
    //  range of the rectangle denoted by the points startDraw
    //  and endDraw. This range is based on the pixel 
    //  representation of the tileMap. This region is then 
    //  translated onto the context so that startDraw is at pos.
    
    var firstCell = {
        x: Math.floor(startDraw.x / this.cellSize),
        y: Math.floor(startDraw.y / this.cellSize)
    };
    
    var offset = {
        x: firstCell.x * this.cellSize - startDraw.x,
        y: firstCell.y * this.cellSize - startDraw.y
    };
    
    offset.x += pos.x;
    offset.y += pos.y;
    
    var cellsWide = Math.ceil((endDraw.x - startDraw.x) / this.cellSize);
    var cellsHigh = Math.ceil((endDraw.y - startDraw.y) / this.cellSize);
    
    for (var x = firstCell.x; x < cellsWide; ++x) {
        for (var y = firstCell.y; y < cellsHigh; ++y) {
            var drawAt = {
                x: offset.x + (x - firstCell.x) * this.cellSize,
                y: offset.y + (y - firstCell.y) * this.cellSize  
            };
            var Tile = this.tileMap[x][y].tile;
            if (Tile != -1)
                context.drawImage(this.tileDictionary[Tile], drawAt.x, drawAt.y, this.cellSize, this.cellSize);
        }
    }
};


TileEngine.prototype.draw = function(pos) {
    //Draws the entire map with the cell (0, 0) at (pos.x, 
    //  pos.y).
    for (var x = 0; x < this.columns; ++x) {
        for (var y = 0; y < this.rows; ++y) {
            var offset = {
                x: pos.x + this.cellSize * x,
                y: pos.y + this.cellSize * y 
            };
            var Tile = this.tileMap[x][y].tile;
            if (Tile != -1)
                context.drawImage(this.tileDictionary[Tile], offset.x, offset.y, this.cellSize, this.cellSize);
        }
    }
};