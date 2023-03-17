export interface HashProvider {
	hash(payload: string): Promise<string>
}