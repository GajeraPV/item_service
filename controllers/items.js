const fs = require('fs');
const _ = require('lodash')

let ItemsData = '../items.json'

const getItemsById = async (req, res) => {
    try {
        console.log("Enter into Items controller getItemsById")
        const ItemsDetails = fs.readFileSync(ItemsData)
        let Items = JSON.parse(ItemsDetails)
        const response = _.filter(Items, { id : req.params.id})
        console.log("Exit from Items controller getItemsById", response)
        res.json(response);
    } catch(error) {
        console.log("error while getItemsById", error)
        res.send(error)
    }    
}

const getAllItems = async (req, res) => {
    try {
        console.log("Enter into Items controller getAllItems")
        let { page, limit, filters, sort } = req.query;
        const ItemsDetails = fs.readFileSync(ItemsData)
        let Items = JSON.parse(ItemsDetails)
        
        let filteredData = _.filter(Items, JSON.parse(filters));
        let sortedData = filteredData.sort(function (firstItems, secondItem) {
            return firstItems[sort] < secondItem[sort];
          });
        page = page || 1,
        limit = limit || 10,
        offset = (page - 1) * limit,
    
        paginatedItems = sortedData.slice(offset).slice(0, limit),
        total_pages = Math.ceil(sortedData.length / limit);
        res.send({
            page: page,
            limit: limit,
            pre_page: page - 1 ? page - 1 : null,
            next_page: (total_pages > page) ? page + 1 : null,
            data: paginatedItems
        });
    } catch(error) {
        console.log("error while getAllItems", error)
        res.send(error)

    }    
}

const addItems = async (req, res) => {
    try {
        console.log("Enter into Items controller addItems")
        const ItemsDetails = fs.readFileSync(ItemsData)
        let Items = JSON.parse(ItemsDetails)
        Items.push(req.body);
        const stringifyData = JSON.stringify(Items)
        fs.writeFileSync(ItemsData, stringifyData)
        console.log("Exit from Items controller addItems")
        res.json({status: "success"})        
    } catch(error) {
        console.log("error while addItems", error)
        res.send(error)

    }    
}

const updateItems = async (req, res) => {
    try {
        console.log("Enter into Items controller updateItems")
        const ItemsDetails = fs.readFileSync(ItemsData)
        let Items = JSON.parse(ItemsDetails)
        Items[req.params['id']] = req.body;
        const stringifyData = JSON.stringify(Items)
        fs.writeFileSync(ItemsData, stringifyData)
        console.log("Exit from Items controller updateItems")
        res.send(`Item has been updated`)
    } catch(error) {
        console.log("error while updateItems", error)
        res.send(error)

    }    
}

const deleteItems = async (req, res) => {
    try {
        console.log("Enter into Items controller deleteItems")
        const ItemsDetails = fs.readFileSync(ItemsData)
        let Items = JSON.parse(ItemsDetails)
        delete Items[req.params['id']]; 
        const stringifyData = JSON.stringify(Items)
        fs.writeFileSync(ItemsData, stringifyData)
        console.log("Exit from Items controller deleteItems")
        res.send(`item has been deleted`)
    } catch(error) {
        console.log("error while deleteItems", error)
        res.send(error)

    }    
}

module.exports = {
    getItemsById,
    getAllItems,
    addItems,
    updateItems,
    deleteItems
}