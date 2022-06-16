export default {
    contract: {
        name: "Counter",
        attributes: [
            {
                    "name": "deadline",
                    "type": "u64",
                    "value": ""
            }
        ]
    },
    entities:  [
    ],
    functions: [
        "update_deadline",
        "deposit_loan",
        "add_user",
        "deposit_collateral",
        "borrowing",
        "settlement",
        "get_block_timestamp",
        "get_contract_info"
    ],
    impl_entities: [
    ]
}