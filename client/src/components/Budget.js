import React from 'react'

const Budget = () => {
    return (
        <div className="container">
            <h1 className="text-center my-3">Personal Expense Tracker</h1>
            <div className="col text-center p-4">
                <h3>Manage Budget</h3>
            </div>
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div class="alert alert-success text-center" role="alert" style={{ width: "100%" }}>
                        <b>Total Income:-</b>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="alert alert-secondary" role="alert" style={{ width: "40%" }}>
                        A simple secondary alert—check it out!
                    </div>
                    <div class="alert alert-primary" role="alert"
                        style={{ width: "40%" }}>
                        A simple primary alert—check it out!
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="alert alert-secondary" role="alert" style={{ width: "40%" }}>
                        A simple secondary alert—check it out!
                    </div>
                    <div class="alert alert-primary" role="alert"
                        style={{ width: "40%" }}>
                        A simple primary alert—check it out!
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="alert alert-secondary" role="alert" style={{ width: "40%" }}>
                        A simple secondary alert—check it out!
                    </div>
                    <div class="alert alert-primary" role="alert"
                        style={{ width: "40%" }}>
                        A simple primary alert—check it out!
                    </div>
                </div>

                <button type="button" className="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Adjust Budget
                </button>
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Adjust Budget</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form class="d-flex justify-content-between">
                                    <div class="form-group">
                                        <label for="per_nes">Enter Neccesities Percentage</label>
                                        <input type="text" class="form-control" id="per_nes" aria-describedby="emailHelp" placeholder="Enter Percentage" v />
                                    </div>
                                    <div class="form-group">
                                        <label for="per_want">Enter Wants Percentage</label>
                                        <input type="text" class="form-control" id="per_want" aria-describedby="emailHelp" placeholder="Enter Percentage" />
                                    </div>
                                    <div class="form-group">
                                        <label for="(100-per_nes-per_want)">Enter Wants Percentage</label>
                                        <input type="text" class="form-control" id="(100-per_nes-per_want)" aria-describedby="emailHelp" placeholder="Enter Percentage" />
                                    </div>

                                </form>

                            </div>
                            <div class="modal-footer">
                                <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Dismiss</button>
                                <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button" class="btn btn-primary">Adjust Budget</button>
                            </div>
                        </div></div> </div>
            </div>

        </div>
    )
}

export default Budget
