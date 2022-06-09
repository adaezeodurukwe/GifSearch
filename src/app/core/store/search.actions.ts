export class SetLoading {
  public static type = 'SetLoading';
  constructor(public payload: boolean) {}
}

export class ResetResult {
  public static type = 'ResetLoading';
}

export class GetResult {
  public static type = 'GetResult';
  constructor(public payload: string) {}
}

export class SetSearchTerm {
  public static type = 'SetSearchTerm';
  constructor(public payload: string) {}
}
