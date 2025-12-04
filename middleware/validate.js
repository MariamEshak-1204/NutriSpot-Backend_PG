
export const validate = (Schema) => {
    return (req , res , next) => {
        
        const inputs = { ...req.body , ...req.params , ...req.query }

        const { error } = Schema.validate(inputs , { abortEarly : false })

        if (error) {
            const errors = error.details.map((item) => ({
                message: item.message,
                field: item.path.join(".")
            }));
            
            return res.status(400).json({
                status: "error",
                errors
            })
        }

        next()
    }
}
